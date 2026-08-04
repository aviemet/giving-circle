module Messaging
  class RecipientsResolver
    Result = Struct.new(:recipients, :skipped, keyword_init: true)

    def initialize(presentation_message:, membership_ids: nil)
      @presentation_message = presentation_message
      @presentation = presentation_message.presentation
      @membership_ids = normalize_membership_ids(membership_ids)
    end

    def call
      recipients = []
      skipped = []

      memberships.each do |membership|
        if skip_for_interaction?(membership)
          skipped << skipped_outcome(membership, "responded_to_interaction")
          next
        end

        address = resolve_address(membership)
        if address.blank?
          skipped << skipped_outcome(membership, "missing_address")
          next
        end

        renderer = Renderer.new(presentation: presentation, membership: membership)
        recipients << BatchRecipient.new(
          membership_id: membership.id,
          to: address,
          body: renderer.render(presentation_message.body),
          subject: renderer.render(presentation_message.subject),
        )
      end

      Result.new(recipients: recipients, skipped: skipped)
    end

    private

    attr_reader :presentation_message, :presentation, :membership_ids

    def normalize_membership_ids(membership_ids)
      return nil if membership_ids.nil?

      Array(membership_ids).map(&:to_s).compact_blank
    end

    def memberships
      scope = presentation.memberships.includes(person: [:user, { contact: :phones }])
      return scope if membership_ids.nil?

      scope.where(id: membership_ids)
    end

    def skip_for_interaction?(membership)
      interaction = presentation_message.skip_interaction
      return false if interaction.nil?

      interaction.interaction_responses.exists?(membership_id: membership.id)
    end

    def resolve_address(membership)
      if presentation_message.medium == "email"
        membership.person&.user&.email
      else
        primary_phone(membership.person)
      end
    end

    def primary_phone(person)
      return nil if person.nil?

      person.phones.order(:created_at).first&.number
    end

    def skipped_outcome(membership, reason)
      RecipientOutcome.new(
        membership_id: membership.id,
        recipient: nil,
        status: "skipped",
        skip_reason: reason,
      )
    end
  end
end

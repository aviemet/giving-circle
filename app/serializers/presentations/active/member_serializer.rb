class Presentations::Active::MemberSerializer < ApplicationSerializer
  object_as :presentations_membership, model: "PresentationsMembership"

  attribute :id, type: :string do
    membership.id
  end

  attribute :slug, type: :string do
    membership.slug
  end

  attribute :name, type: :string do
    membership.name
  end

  attribute :number, type: :string do
    membership.number
  end

  attribute :email, type: :string do
    membership.person&.user&.email
  end

  attribute :funds, type: "Money" do
    money_payload(membership.funds)
  end

  attribute :presentation_funds, type: "Money" do
    money_payload(@object.funds)
  end

  attribute :finalist_votes, type: :number do
    finalist_votes_for(membership)
  end

  attribute :finalist_interaction_membership_id, type: :string do
    finalist_interaction_membership&.id
  end

  attribute :finalist_interaction_slug, type: :string do
    finalist_interaction&.slug
  end

  private

  def membership
    @object.membership
  end

  def finalist_interaction
    @finalist_interaction ||= PresentationValues::Finalists.finalist_source_interaction(@object.presentation)
  end

  def finalist_interaction_membership
    return if finalist_interaction.blank?

    @finalist_interaction_membership ||= finalist_interaction.interaction_memberships
      .find_by(membership_id: membership.id)
  end

  def finalist_votes_for(membership_record)
    return if finalist_interaction.blank?

    finalist_interaction.available_votes_for(membership_record)
  end

  def money_payload(money)
    return nil if money.nil?

    {
      amount: money.to_f,
      cents: money.cents,
      currency_iso: money.currency.iso_code,
    }
  end
end

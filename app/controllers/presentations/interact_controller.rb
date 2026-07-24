class Presentations::InteractController < ApplicationController
  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug
  expose :presentation, -> {
    Presentation.includes(:slides, :theme, :interactions).find_by!(slug: params[:presentation_slug])
  }

  strong_params :presentation_interaction_response, permit: [
    { response_data: {} },
  ]

  # @route GET /:circle_slug/p/:presentation_slug/interact (circle_presentation_interact)
  def show
    disable_menu_rendering
    authorize presentation, policy_class: Presentation::InteractPolicy

    membership = presentation.membership_for_user(current_user)
    active_interaction = presentation.accepting_interaction
    if active_interaction
      active_interaction.sync_interaction_memberships!
    end
    response_record = nil
    if active_interaction && membership && !pledges_interaction?(active_interaction)
      response_record = active_interaction.interaction_responses
        .where(membership_id: membership.id)
        .order(updated_at: :desc)
        .first
    end

    render inertia: "Presentations/Interact/Show", props: {
      presentation: -> { presentation.render(:presentation) },
      theme: -> { presentation.theme.render(:persisted) },
      circle: -> { circle.render(:persisted) },
      active_interaction: -> { active_interaction&.render(:active_interaction) },
      presentation_interaction_response: -> { response_record&.render(:show) },
      available_funds: -> { money_payload(presentation.available_funds_for(membership)) },
      available_votes: -> {
        return nil unless active_interaction && membership

        active_interaction.available_votes_for(membership)
      },
    }
  end

  # @route PATCH /:circle_slug/p/:presentation_slug/interact (circle_presentation_interact)
  def upsert
    disable_menu_rendering
    authorize presentation, :upsert?, policy_class: Presentation::InteractPolicy

    membership = presentation.membership_for_user(current_user)
    interaction = presentation.accepting_interaction

    if membership.blank? || interaction.blank?
      redirect_to circle_presentation_interact_path(circle, presentation),
        alert: t("presentations.interact.notices.not_accepting")
      return
    end

    response_record = if pledges_interaction?(interaction)
      interaction.interaction_responses.build(membership_id: membership.id)
    else
      interaction.interaction_responses.find_or_initialize_by(membership_id: membership.id)
    end
    response_record.assign_attributes(presentation_interaction_response_params)

    if response_record.save
      redirect_to circle_presentation_interact_path(circle, presentation),
        notice: t("presentations.interact.notices.saved")
    else
      redirect_to circle_presentation_interact_path(circle, presentation),
        inertia: { errors: response_record.errors }
    end
  end

  private

  def pledges_interaction?(interaction)
    interaction.interaction_ui_template&.slug == "pledges"
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

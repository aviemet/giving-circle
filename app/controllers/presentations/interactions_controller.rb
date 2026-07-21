class Presentations::InteractionsController < ApplicationController
  expose :presentation, id: -> { params[:presentation_slug] }, find_by: :slug

  expose :presentation_interactions, -> { search(presentation.interactions.includes_associated) }
  expose :presentation_interaction,
    model: "Presentation::Interaction",
    scope: -> { presentation.interactions },
    id: -> { params[:slug] },
    find: ->(slug, scope) { scope.includes_associated.friendly.find(slug) }

  strong_params :presentation_interaction, permit: [
    :name,
    :results,
    :trigger_type,
    :accepting_responses,
    { config: {} },
    { trigger_conditions: [:slide_slug] },
  ]

  sortable_fields %w(slug name trigger_type)

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions (theme_presentation_interactions)
  def index
    authorize presentation_interactions, policy_class: Presentation::InteractionPolicy

    paginated_presentation_interactions = paginate(presentation_interactions, :presentation_interactions)

    render inertia: "Presentations/Interactions/Index", props: {
      presentation_interactions: -> { paginated_presentation_interactions.render(:index) },
      pagination: -> { {
        count: presentation_interactions.size,
        **pagination_data(paginated_presentation_interactions)
      } },
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:slug (theme_presentation_interaction)
  def show
    authorize presentation_interaction, policy_class: Presentation::InteractionPolicy
    render inertia: "Presentations/Interactions/Show", props: {
      presentation_interaction: -> { presentation_interaction.render(:show) },
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/new (new_theme_presentation_interaction)
  def new
    authorize Presentation::Interaction.new, policy_class: Presentation::InteractionPolicy
    interaction = presentation.interactions.build(
      config: Presentation::Interaction::BLANK_CONFIG.deep_dup,
    )
    render inertia: "Presentations/Interactions/New", props: {
      presentation_interaction: interaction.render(:form_data),
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:slug/edit (edit_theme_presentation_interaction)
  def edit
    authorize presentation_interaction, policy_class: Presentation::InteractionPolicy
    render inertia: "Presentations/Interactions/Edit", props: {
      presentation_interaction: presentation_interaction.render(:edit),
    }
  end

  # @route POST /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions (theme_presentation_interactions)
  def create
    authorize Presentation::Interaction.new, policy_class: Presentation::InteractionPolicy
    presentation_interaction.presentation = presentation

    if presentation_interaction.save
      redirect_to theme_presentation_interaction_path(presentation.circle, presentation.theme, presentation, presentation_interaction),
        notice: t("presentations.interactions.notices.created")
    else
      redirect_to new_theme_presentation_interaction_path(presentation.circle, presentation.theme, presentation),
        inertia: { errors: presentation_interaction.errors }
    end
  end

  # @route PATCH /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:slug (theme_presentation_interaction)
  # @route PUT /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:slug (theme_presentation_interaction)
  def update
    authorize presentation_interaction, policy_class: Presentation::InteractionPolicy
    if presentation_interaction.update(presentation_interaction_params)
      redirect_to theme_presentation_interaction_path(presentation.circle, presentation.theme, presentation, presentation_interaction),
        notice: t("presentations.interactions.notices.updated")
    else
      redirect_to edit_theme_presentation_interaction_path(presentation.circle, presentation.theme, presentation, presentation_interaction),
        inertia: { errors: presentation_interaction.errors }
    end
  end

  # @route DELETE /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:slug (theme_presentation_interaction)
  def destroy
    authorize presentation_interaction, policy_class: Presentation::InteractionPolicy
    presentation_interaction.destroy!
    redirect_to theme_presentation_interactions_path(presentation.circle, presentation.theme, presentation),
      notice: t("presentations.interactions.notices.destroyed")
  end

  # @route POST /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:slug/open_responses (open_responses_theme_presentation_interaction)
  def open_responses
    authorize presentation_interaction, policy_class: Presentation::InteractionPolicy
    presentation_interaction.open_responses!
    ActivePresentation::Cache.schedule_refresh(presentation.id)
    redirect_to theme_presentation_interaction_path(presentation.circle, presentation.theme, presentation, presentation_interaction),
      notice: t("presentations.interactions.notices.accepting")
  end

  # @route POST /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/interactions/:slug/close_responses (close_responses_theme_presentation_interaction)
  def close_responses
    authorize presentation_interaction, policy_class: Presentation::InteractionPolicy
    presentation_interaction.close_responses!
    ActivePresentation::Cache.schedule_refresh(presentation.id)
    redirect_to theme_presentation_interaction_path(presentation.circle, presentation.theme, presentation, presentation_interaction),
      notice: t("presentations.interactions.notices.not_accepting")
  end

end

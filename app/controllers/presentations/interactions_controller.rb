class Presentations::InteractionsController < ApplicationController
  expose :presentation_interactions, -> { search(Presentation::Interaction.includes_associated) }
  expose :presentation_interaction, find: ->(id, scope){ scope.includes_associated.find(id) }

  strong_params :presentation_interaction, permit: [:slug, :interaction_type, :config, :results, :trigger_type, :trigger_conditions]

  sortable_fields %w(slug interaction_type config results trigger_type trigger_conditions)

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/:presentation_slug/interactions (theme_presentation_interactions)
  def index
    authorize presentation_interactions

    paginated_presentation_interactions = paginate(presentation_interactions, :presentation_interactions)

    render inertia: "Presentation::Interactions/Index", props: {
      presentation_interactions: -> { paginated_presentation_interactions.render(:index) },
      pagination: -> { {
        count: presentation_interactions.size,
        **pagination_data(paginated_presentation_interactions)
      } },
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/:presentation_slug/interactions/:id (theme_presentation_interaction)
  def show
    authorize presentation_interaction
    render inertia: "Presentation::Interactions/Show", props: {
      presentation_interaction: -> { presentation_interaction.render(:show) }
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/:presentation_slug/interactions/new (new_theme_presentation_interaction)
  def new
    authorize Presentation::Interaction.new
    render inertia: "Presentation::Interactions/New", props: {
      presentation_interaction: Presentation::Interaction.new.render(:form_data)
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/:presentation_slug/interactions/:id/edit (edit_theme_presentation_interaction)
  def edit
    authorize presentation_interaction
    render inertia: "Presentation::Interactions/Edit", props: {
      presentation_interaction: presentation_interaction.render(:edit)
    }
  end

  # @route POST /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/:presentation_slug/interactions (theme_presentation_interactions)
  def create
    authorize Presentation::Interaction.new
    if presentation_interaction.save
      redirect_to presentation_interaction, notice: "Interaction was successfully created."
    else
      redirect_to new_presentation_interaction_path, inertia: { errors: presentation_interaction.errors }
    end
  end

  # @route PATCH /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/:presentation_slug/interactions/:id (theme_presentation_interaction)
  # @route PUT /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/:presentation_slug/interactions/:id (theme_presentation_interaction)
  def update
    authorize presentation_interaction
    if presentation_interaction.update(presentation_interaction_params)
      redirect_to presentation_interaction, notice: "Interaction was successfully updated."
    else
      redirect_to edit_presentation_interaction_path, inertia: { errors: presentation_interaction.errors }
    end
  end

  # @route DELETE /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/:presentation_slug/interactions/:id (theme_presentation_interaction)
  def destroy
    authorize presentation_interaction
    presentation_interaction.destroy!
    redirect_to presentation_interactions_url, notice: "Interaction was successfully destroyed."
  end

end

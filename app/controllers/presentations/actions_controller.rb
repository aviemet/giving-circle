class Presentations::ActionsController < ApplicationController
  expose :presentation_actions, -> { search(Presentation::Action.includes_associated) }
  expose :presentation_action, find: ->(id, scope){ scope.includes_associated.find(id) }

  strong_params :presentation_action, permit: [:slug, :action_type, :config, :results, :trigger_type, :trigger_conditions]

  sortable_fields %w(slug action_type config results trigger_type trigger_conditions)

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/actions (theme_presentations_actions)
  def index
    authorize presentation_actions

    paginated_presentation_actions = paginate(presentation_actions, :presentation_actions)

    render inertia: "Presentation::Actions/Index", props: {
      presentation_actions: -> { paginated_presentation_actions.render(:index) },
      pagination: -> { {
        count: presentation_actions.size,
        **pagination_data(paginated_presentation_actions)
      } },
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/actions/:id (theme_presentations_action)
  def show
    authorize presentation_action
    render inertia: "Presentation::Actions/Show", props: {
      presentation_action: -> { presentation_action.render(:show) }
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/actions/new (new_theme_presentations_action)
  def new
    authorize Presentation::Action.new
    render inertia: "Presentation::Actions/New", props: {
      presentation_action: Presentation::Action.new.render(:form_data)
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/actions/:id/edit (edit_theme_presentations_action)
  def edit
    authorize presentation_action
    render inertia: "Presentation::Actions/Edit", props: {
      presentation_action: presentation_action.render(:edit)
    }
  end

  # @route POST /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/actions (theme_presentations_actions)
  def create
    authorize Presentation::Action.new
    if presentation_action.save
      redirect_to presentation_action, notice: "Action was successfully created."
    else
      redirect_to new_presentation_action_path, inertia: { errors: presentation_action.errors }
    end
  end

  # @route PATCH /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/actions/:id (theme_presentations_action)
  # @route PUT /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/actions/:id (theme_presentations_action)
  def update
    authorize presentation_action
    if presentation_action.update(presentation_action_params)
      redirect_to presentation_action, notice: "Action was successfully updated."
    else
      redirect_to edit_presentation_action_path, inertia: { errors: presentation_action.errors }
    end
  end

  # @route DELETE /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/actions/:id (theme_presentations_action)
  def destroy
    authorize presentation_action
    presentation_action.destroy!
    redirect_to presentation_actions_url, notice: "Action was successfully destroyed."
  end

end

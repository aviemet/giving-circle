class PresentationsController < ApplicationController
  expose :theme, id: -> { params[:theme_slug] }, find_by: :slug

  expose :presentations, -> { search(Presentation.includes_associated, sortable_fields) }
  expose :presentation, find: ->(id, scope) { scope.includes_associated.find(id) }

  strong_params :presentation, permit: [:name, :theme_id]

  # @route GET /themes/:theme_slug/presentations {export: true} (theme_presentations)
  def index
    authorize presentations

    paginated_presentations = paginate(presentations, :items)

    render inertia: "Presentations/Index", props: {
      presentations: -> { paginated_presentations.render(:index) },
      pagination: -> { {
        count: presentations.size,
        **pagination_data(paginated_presentations)
      } },
      theme: -> { theme.render(:shallow) },
      circle: -> { theme.circle.render(:persisted) }
    }, layout: "something"
  end

  # @route GET /presentations/:id {export: true} (presentation)
  def show
    authorize presentation
    render inertia: "Presentations/Show", props: {
      presentation: -> { presentation.render(:show) }
    }
  end

  # @route GET /themes/:theme_slug/presentations/new {export: true} (new_theme_presentation)
  def new
    authorize Presentation.new
    render inertia: "Presentations/New", props: {
      presentation: Presentation.new.render(:form_data)
    }
  end

  # @route GET /presentations/:id/edit {export: true} (edit_presentation)
  def edit
    authorize presentation
    render inertia: "Presentations/Edit", props: {
      presentation: presentation.render(:edit)
    }
  end

  # @route GET /presentation/:id {export: true} (run_presentation)
  def run_presentation
    authorize presentation
    render inertia: "Present/Presentations/Presentation", props: {
      presentation: presentation.render(:presentation)
    }
  end

  # @route POST /themes/:theme_slug/presentations {export: true} (theme_presentations)
  def create
    authorize Presentation.new
    if presentation.save
      redirect_to presentation, notice: "Presentation was successfully created."
    else
      redirect_to new_presentation_path, inertia: { errors: presentation.errors }
    end
  end

  # @route PATCH /presentations/:id {export: true} (presentation)
  # @route PUT /presentations/:id {export: true} (presentation)
  def update
    authorize presentation
    if presentation.update(presentation_params)
      redirect_to presentation, notice: "Presentation was successfully updated."
    else
      redirect_to edit_presentation_path, inertia: { errors: presentation.errors }
    end
  end

  # @route DELETE /themes/:theme_slug/presentations {export: true} (theme_presentations)
  # @route DELETE /presentations/:id {export: true} (presentation)
  def destroy
    authorize presentation
    presentation.destroy!
    redirect_to presentations_url, notice: "Presentation was successfully destroyed."
  end

  private

  def sortable_fields
    %w(theme_id name).freeze
  end

  def presentation_params
    params.require(:presentation).permit(:theme_id, :name)
  end
end

class PresentationsController < ApplicationController
  include Searchable

  expose :theme, id: -> { params[:theme_slug] }, find_by: :slug
  expose :circle, -> { theme.circle }

  expose :presentations, -> { search(Presentation.includes_associated, sortable_fields) }
  expose :presentation, find: ->(id, scope) { scope.includes_associated.find(id) }

  # @route GET /themes/:theme_id/presentations (theme_presentations)
  def index
    authorize presentations

    paginated_presentations = presentations.page(params[:page] || 1).per(current_user.limit(:items))

    render inertia: "Presentations/Index", props: {
      presentations: -> { paginated_presentations.render(view: :index) },
      pagination: -> { {
        count: presentations.size,
        **pagination_data(paginated_presentations)
      } },
      theme: -> { theme.render(view: :shallow) },
    }
  end

  # @route GET /presentations/:id (presentation)
  def show
    authorize presentation
    render inertia: "Presentations/Show", props: {
      presentation: -> { presentation.render(view: :show) }
    }
  end

  # @route GET /themes/:theme_id/presentations/new (new_theme_presentation)
  def new
    authorize Presentation.new
    render inertia: "Presentations/New", props: {
      presentation: Presentation.new.render(view: :form_data)
    }
  end

  # @route GET /presentations/:id/edit (edit_presentation)
  def edit
    authorize presentation
    render inertia: "Presentations/Edit", props: {
      presentation: presentation.render(view: :edit)
    }
  end

  # @route GET /presentation/:id (run_presentation)
  def run_presentation
    authorize presentation
    render inertia: "Presentations/Presentation", props: {
      presentation: presentation.render(view: :presentation)
    }
  end

  # @route POST /themes/:theme_id/presentations (theme_presentations)
  def create
    authorize Presentation.new
    if presentation.save
      redirect_to presentation, notice: "Presentation was successfully created."
    else
      redirect_to new_presentation_path, inertia: { errors: presentation.errors }
    end
  end

  # @route PATCH /presentations/:id (presentation)
  # @route PUT /presentations/:id (presentation)
  def update
    authorize presentation
    if presentation.update(presentation_params)
      redirect_to presentation, notice: "Presentation was successfully updated."
    else
      redirect_to edit_presentation_path, inertia: { errors: presentation.errors }
    end
  end

  # @route DELETE /themes/:theme_id/presentations (theme_presentations)
  # @route DELETE /presentations/:id (presentation)
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

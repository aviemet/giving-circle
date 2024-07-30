class PresentationsController < ApplicationController
  expose :theme, id: -> { params[:theme_slug] }, find_by: :slug

  expose :presentations, -> { search(theme.presentations.includes_associated, sortable_fields) }
  expose :presentation, id: -> { params[:presentation_slug] }, scope: -> { theme.presentations }, find_by: :slug

  strong_params :presentation, permit: [:name, :theme_id]

  # @route GET /circles/:circle_slug/themes/:theme_slug/presentations (circle_theme_presentations)
  def index
    authorize presentations

    paginated_presentations = paginate(presentations, :presentations)

    render inertia: "Presentations/Index", props: {
      presentations: -> { paginated_presentations.render(:index) },
      pagination: -> { {
        count: presentations.size,
        **pagination_data(paginated_presentations)
      } },
      theme: -> { theme.render(:inertia_share) },
      circle: -> { theme.circle.render(:persisted) }
    }, layout: "something"
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug (circle_theme_presentation)
  def show
    authorize presentation

    render inertia: "Presentations/Show", props: {
      presentation: -> { presentation.render(:show) }
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/presentations/new (new_circle_theme_presentation)
  def new
    authorize Presentation.new
    render inertia: "Presentations/New", props: {
      presentation: Presentation.new.render(:form_data)
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/edit (circle_theme_edit_presentation)
  def edit
    authorize presentation
    render inertia: "Presentations/Edit", props: {
      presentation: presentation.render(:edit)
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/active (circle_theme_presentation_active)
  def active
    authorize presentation
    render inertia: "Presentations/Active", props: {
      presentation: presentation.render(:presentation)
    }
  end

  # @route POST /circles/:circle_slug/themes/:theme_slug/presentations (circle_theme_presentations)
  def create
    authorize Presentation.new
    if presentation.save
      redirect_to presentation, notice: "Presentation was successfully created."
    else
      redirect_to new_presentation_path, inertia: { errors: presentation.errors }
    end
  end

  # @route PATCH /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug (circle_theme_presentation)
  # @route PUT /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug (circle_theme_presentation)
  def update
    authorize presentation
    if presentation.update(presentation_params)
      redirect_to presentation, notice: "Presentation was successfully updated."
    else
      redirect_to edit_presentation_path, inertia: { errors: presentation.errors }
    end
  end

  # @route DELETE /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug (circle_theme_presentation)
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

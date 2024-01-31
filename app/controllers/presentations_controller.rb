class PresentationsController < ApplicationController
  include Searchable

  expose :presentations, -> { search(Presentation.includes_associated, sortable_fields) }
  expose :presentation, find: ->(id, scope) { scope.includes_associated.find(id) }

  # @route GET /themes/:theme_slug/presentations (theme_presentations)
  def index
    authorize presentations
    render inertia: "Presentations/Index", props: {
      presentations: -> { presentations.render }
    }
  end

  # @route GET /presentations/:id (presentation)
  def show
    authorize presentation
    render inertia: "Presentations/Show", props: {
      presentation: -> { presentation.render }
    }
  end

  # @route GET /themes/:theme_slug/presentations/new (new_theme_presentation)
  def new
    authorize Presentation.new
    render inertia: "Presentations/New", props: {
      presentation: Presentation.new.render
    }
  end

  # @route GET /presentations/:id/edit (edit_presentation)
  def edit
    authorize presentation
    render inertia: "Presentations/Edit", props: {
      presentation: presentation.render
    }
  end

  # @route POST /themes/:theme_slug/presentations (theme_presentations)
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

  # @route DELETE /themes/:theme_slug/presentations (theme_presentations)
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

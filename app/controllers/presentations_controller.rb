class PresentationsController < ApplicationController
  include Searchable

  expose :presentations, -> { search(Presentation.includes_associated, sortable_fields) }
    expose :presentation, find: ->(id, scope){ scope.includes_associated.find(id) }
  
  # GET /presentations
  def index
    authorize presentations
    render inertia: "Presentations/Index", props: {
      presentations: -> { presentations.render }
    }
  end

  # GET /presentations/:id
  def show
    authorize presentation
    render inertia: "Presentations/Show", props: {
      presentation: -> { presentation.render }
    }
  end

  # GET /presentations/new
  def new
    authorize Presentation.new
    render inertia: "Presentations/New", props: {
      presentation: Presentation.new.render
    }
  end

  # GET /presentations/:id/edit
  def edit
    authorize presentation
    render inertia: "Presentations/Edit", props: {
      presentation: presentation.render
    }
  end

  # POST /presentations
  def create
    authorize Presentation.new
    if presentation.save
      redirect_to presentation, notice: "Presentation was successfully created."
    else
      redirect_to new_presentation_path, inertia: { errors: presentation.errors }
    end
  end

  # PATCH/PUT /presentations/:id
  def update
    authorize presentation
    if presentation.update(presentation_params)
      redirect_to presentation, notice: "Presentation was successfully updated."
    else
      redirect_to edit_presentation_path, inertia: { errors: presentation.errors }
    end
  end

  # DELETE /presentations/:id
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

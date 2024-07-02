class PresentationElementsController < ApplicationController
  include Searchable

  expose :presentation_elements, -> { search(PresentationElement.includes_associated, sortable_fields) }
    expose :presentation_element, find: ->(id, scope){ scope.includes_associated.find(id) }
  
  # GET /presentation_elements
  def index
    authorize presentation_elements

    paginated_%= plural_table_name %> = %= plural_table_name %>.page(params[:page] || 1).per(current_user.limit(:items))

    render inertia: "PresentationElements/Index", props: {
      presentation_elements: -> { presentation_elements.render(view: :index) }
    }
  end

  # GET /presentation_elements/:id
  def show
    authorize presentation_element
    render inertia: "PresentationElements/Show", props: {
      presentation_element: -> { presentation_element.render(view: :show) }
    }
  end

  # GET /presentation_elements/new
  def new
    authorize PresentationElement.new
    render inertia: "PresentationElements/New", props: {
      presentation_element: PresentationElement.new.render(view: :new)
    }
  end

  # GET /presentation_elements/:id/edit
  def edit
    authorize presentation_element
    render inertia: "PresentationElements/Edit", props: {
      presentation_element: presentation_element.render(view: :edit)
    }
  end

  # POST /presentation_elements
  def create
    authorize PresentationElement.new
    if presentation_element.save
      redirect_to presentation_element, notice: "Presentation element was successfully created."
    else
      redirect_to new_presentation_element_path, inertia: { errors: presentation_element.errors }
    end
  end

  # PATCH/PUT /presentation_elements/:id
  def update
    authorize presentation_element
    if presentation_element.update(presentation_element_params)
      redirect_to presentation_element, notice: "Presentation element was successfully updated."
    else
      redirect_to edit_presentation_element_path, inertia: { errors: presentation_element.errors }
    end
  end

  # DELETE /presentation_elements/:id
  def destroy
    authorize presentation_element
    presentation_element.destroy!
    redirect_to presentation_elements_url, notice: "Presentation element was successfully destroyed."
  end

  private

  def sortable_fields
    %w(title data element).freeze
  end

  def presentation_element_params
    params.require(:presentation_element).permit(:title, :data, :element)
  end
end

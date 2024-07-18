class PresentationElementsController < ApplicationController
  expose :elements, -> { search(PresentationElement.includes_associated, sortable_fields) }
  expose :element, find: ->(id, scope){ scope.includes_associated.find(id) }

  strong_params :element, permit: [:title, :data, :element]

  # GET /elements
  def index
    authorize elements

    paginated_elements = paginate(elements, :items)

    render inertia: "PresentationElements/Index", props: {
      elements: -> { paginated_elements.render(:index) },
      pagination: -> { {
        count: elements.size,
        **pagination_data(paginated_elements)
      } },
    }
  end

  # GET /elements/:id
  def show
    authorize element
    render inertia: "PresentationElements/Show", props: {
      element: -> { element.render(:show) }
    }
  end

  # GET /elements/new
  def new
    authorize PresentationElement.new
    render inertia: "PresentationElements/New", props: {
      element: PresentationElement.new.render(:new)
    }
  end

  # GET /elements/:id/edit
  def edit
    authorize element
    render inertia: "PresentationElements/Edit", props: {
      element: element.render(:edit)
    }
  end

  # POST /elements
  def create
    authorize PresentationElement.new
    if element.save
      redirect_to element, notice: "Presentation element was successfully created."
    else
      redirect_to new_element_path, inertia: { errors: element.errors }
    end
  end

  # PATCH/PUT /elements/:id
  def update
    authorize element
    if element.update(element_params)
      redirect_to element, notice: "Presentation element was successfully updated."
    else
      redirect_to edit_element_path, inertia: { errors: element.errors }
    end
  end

  # DELETE /elements/:id
  def destroy
    authorize element
    element.destroy!
    redirect_to elements_url, notice: "Presentation element was successfully destroyed."
  end

  private

  def sortable_fields
    %w(title data element).freeze
  end
end

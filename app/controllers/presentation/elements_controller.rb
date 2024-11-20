class Presentation::ElementsController < ApplicationController
  expose :presentation_elements, -> { search(Presentation::Element.includes_associated) }
  expose :presentation_element, find: ->(id, scope){ scope.includes_associated.find(id) }
  
  strong_params :presentation_element, :data, :name, :template

  sortable_fields %w(data name template)

  def index
    authorize presentation_elements

    paginated_presentation_elements = paginate(presentation_elements, :presentation_elements)

    render inertia: "Presentation::Elements/Index", props: {
      presentation_elements: -> { paginated_presentation_elements.render(:index) },
      pagination: -> { {
        count: presentation_elements.size,
        **pagination_data(paginated_presentation_elements)
      } },
    }
  end

  def show
    authorize presentation_element
    render inertia: "Presentation::Elements/Show", props: {
      presentation_element: -> { presentation_element.render(:show) }
    }
  end

  def new
    authorize Presentation::Element.new
    render inertia: "Presentation::Elements/New", props: {
      presentation_element: Presentation::Element.new.render(:form_data)
    }
  end

  def edit
    authorize presentation_element
    render inertia: "Presentation::Elements/Edit", props: {
      presentation_element: presentation_element.render(:edit)
    }
  end

  def create
    authorize Presentation::Element.new
    if presentation_element.save
      redirect_to presentation_element, notice: "Element was successfully created."
    else
      redirect_to new_presentation_element_path, inertia: { errors: presentation_element.errors }
    end
  end

  def update
    authorize presentation_element
    if presentation_element.update(presentation_element_params)
      redirect_to presentation_element, notice: "Element was successfully updated."
    else
      redirect_to edit_presentation_element_path, inertia: { errors: presentation_element.errors }
    end
  end

  def destroy
    authorize presentation_element
    presentation_element.destroy!
    redirect_to presentation_elements_url, notice: "Element was successfully destroyed."
  end

end

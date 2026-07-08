class Presentations::ElementsController < ApplicationController
  expose :presentation, id: -> { params[:presentation_slug] }, find_by: :slug

  expose :presentation_elements, -> { search(Presentation::Element.includes_associated) }
  expose :presentation_element,
    model: "Presentation::Element",
    id: -> { params[:slug] },
    find: ->(slug, scope) { scope.includes_associated.friendly.find(slug) }

  strong_params :presentation_element, permit: %i(name data template)

  sortable_fields %w(data name slug template)

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements (theme_presentation_elements)
  def index
    authorize Presentation::Element, policy_class: Presentation::ElementPolicy

    paginated_presentation_elements = paginate(presentation_elements, :presentation_elements)

    render inertia: "Presentations/Elements/Index", props: {
      presentation_elements: -> { paginated_presentation_elements.render(:index) },
      pagination: -> { {
        count: presentation_elements.size,
        **pagination_data(paginated_presentation_elements)
      } },
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements/:slug (theme_presentation_element)
  def show
    authorize presentation_element, policy_class: Presentation::ElementPolicy
    render inertia: "Presentations/Elements/Show", props: {
      presentation_element: -> { presentation_element.render(:show) }
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements/new (new_theme_presentation_element)
  def new
    authorize Presentation::Element.new, policy_class: Presentation::ElementPolicy
    render inertia: "Presentations/Elements/New", props: {
      presentation_element: Presentation::Element.new.render(:form_data)
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements/:slug/edit (edit_theme_presentation_element)
  def edit
    authorize presentation_element, policy_class: Presentation::ElementPolicy
    render inertia: "Presentations/Elements/Edit", props: {
      presentation_element: presentation_element.render(:edit)
    }
  end

  # @route POST /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements (theme_presentation_elements)
  def create
    authorize Presentation::Element.new, policy_class: Presentation::ElementPolicy
    if presentation_element.save
      redirect_to theme_presentation_element_path(presentation.circle, presentation.theme, presentation, presentation_element),
        notice: "Element was successfully created."
    else
      redirect_to new_theme_presentation_element_path(presentation.circle, presentation.theme, presentation),
        inertia: { errors: presentation_element.errors }
    end
  end

  # @route PATCH /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements/:slug (theme_presentation_element)
  # @route PUT /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements/:slug (theme_presentation_element)
  def update
    authorize presentation_element, policy_class: Presentation::ElementPolicy
    if presentation_element.update(presentation_element_params)
      redirect_to theme_presentation_element_path(presentation.circle, presentation.theme, presentation, presentation_element),
        notice: "Element was successfully updated."
    else
      redirect_to edit_theme_presentation_element_path(presentation.circle, presentation.theme, presentation, presentation_element),
        inertia: { errors: presentation_element.errors }
    end
  end

  # @route DELETE /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements/:slug (theme_presentation_element)
  def destroy
    authorize presentation_element, policy_class: Presentation::ElementPolicy
    presentation_element.destroy!
    redirect_to theme_presentation_elements_path(presentation.circle, presentation.theme, presentation),
      notice: "Element was successfully destroyed."
  end

end

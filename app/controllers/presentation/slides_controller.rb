class Presentation::SlidesController < ApplicationController
  expose :presentation_slides, -> { search(Presentation::Slide.includes_associated) }
  expose :presentation_slide, find: ->(id, scope){ scope.includes_associated.find(id) }
  
  strong_params :presentation_slide, :name, :data, :order, :template

  sortable_fields %w(name data order template)

  def index
    authorize presentation_slides

    paginated_presentation_slides = paginate(presentation_slides, :presentation_slides)

    render inertia: "Presentation::Slides/Index", props: {
      presentation_slides: -> { paginated_presentation_slides.render(:index) },
      pagination: -> { {
        count: presentation_slides.size,
        **pagination_data(paginated_presentation_slides)
      } },
    }
  end

  def show
    authorize presentation_slide
    render inertia: "Presentation::Slides/Show", props: {
      presentation_slide: -> { presentation_slide.render(:show) }
    }
  end

  def new
    authorize Presentation::Slide.new
    render inertia: "Presentation::Slides/New", props: {
      presentation_slide: Presentation::Slide.new.render(:form_data)
    }
  end

  def edit
    authorize presentation_slide
    render inertia: "Presentation::Slides/Edit", props: {
      presentation_slide: presentation_slide.render(:edit)
    }
  end

  def create
    authorize Presentation::Slide.new
    if presentation_slide.save
      redirect_to presentation_slide, notice: "Slide was successfully created."
    else
      redirect_to new_presentation_slide_path, inertia: { errors: presentation_slide.errors }
    end
  end

  def update
    authorize presentation_slide
    if presentation_slide.update(presentation_slide_params)
      redirect_to presentation_slide, notice: "Slide was successfully updated."
    else
      redirect_to edit_presentation_slide_path, inertia: { errors: presentation_slide.errors }
    end
  end

  def destroy
    authorize presentation_slide
    presentation_slide.destroy!
    redirect_to presentation_slides_url, notice: "Slide was successfully destroyed."
  end

end
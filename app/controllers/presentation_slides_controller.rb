class PresentationSlidesController < ApplicationController
  include Searchable

  expose :presentation_slides, -> { search(PresentationSlide.includes_associated, sortable_fields) }
  expose :presentation_slide, find: ->(id, scope){ scope.includes_associated.find(id) }

  # GET /presentation_slides
  def index
    authorize presentation_slides

    paginated_presentation_slides = paginate(presentation_slides, :presentation_slides)

    render inertia: "PresentationSlides/Index", props: {
      presentation_slides: -> { paginated_presentation_slides.render(:index) },
      pagination: -> { {
        count: presentation_slides.size,
        **pagination_data(paginated_presentation_slides)
      } },
    }
  end

  # GET /presentation_slides/:id
  def show
    authorize presentation_slide
    render inertia: "PresentationSlides/Show", props: {
      presentation_slide: -> { presentation_slide.render(:show) }
    }
  end

  # GET /presentation_slides/new
  def new
    authorize PresentationSlide.new
    render inertia: "PresentationSlides/New", props: {
      presentation_slide: PresentationSlide.new.render(:form_data)
    }
  end

  # GET /presentation_slides/:id/edit
  def edit
    authorize presentation_slide
    render inertia: "PresentationSlides/Edit", props: {
      presentation_slide: presentation_slide.render(:edit)
    }
  end

  # POST /presentation_slides
  def create
    authorize PresentationSlide.new
    if presentation_slide.save
      redirect_to presentation_slide, notice: "Presentation slide was successfully created."
    else
      redirect_to new_presentation_slide_path, inertia: { errors: presentation_slide.errors }
    end
  end

  # PATCH/PUT /presentation_slides/:id
  def update
    authorize presentation_slide
    if presentation_slide.update(presentation_slide_params)
      redirect_to presentation_slide, notice: "Presentation slide was successfully updated."
    else
      redirect_to edit_presentation_slide_path, inertia: { errors: presentation_slide.errors }
    end
  end

  # DELETE /presentation_slides/:id
  def destroy
    authorize presentation_slide
    presentation_slide.destroy!
    redirect_to presentation_slides_url, notice: "Presentation slide was successfully destroyed."
  end

  private

  def sortable_fields
    %w().freeze
  end

  def presentation_slide_params
    params.fetch(:presentation_slide, {})
  end
end

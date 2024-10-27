class PresentationSlidesController < ApplicationController
  include Searchable

  expose :presentation_slides, -> { search(PresentationSlide.includes_associated) }
  expose :presentation_slide, find: ->(id, scope){ scope.includes_associated.find(id) }

  strong_params :presentation_slide

  sortable_fields %w()

  # @route GET /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_slides (circle_theme_presentation_slides)
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

  # @route GET /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_slides/:id (circle_theme_presentation_slide)
  def show
    authorize presentation_slide
    render inertia: "PresentationSlides/Show", props: {
      presentation_slide: -> { presentation_slide.render(:show) }
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_slides/new (new_circle_theme_presentation_slide)
  def new
    authorize PresentationSlide.new
    render inertia: "PresentationSlides/New", props: {
      presentation_slide: PresentationSlide.new.render(:form_data)
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_slides/:id/edit (edit_circle_theme_presentation_slide)
  def edit
    authorize presentation_slide
    render inertia: "PresentationSlides/Edit", props: {
      presentation_slide: presentation_slide.render(:edit)
    }
  end

  # @route POST /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_slides (circle_theme_presentation_slides)
  def create
    authorize PresentationSlide.new
    if presentation_slide.save
      redirect_to presentation_slide, notice: "Presentation slide was successfully created."
    else
      redirect_to new_presentation_slide_path, inertia: { errors: presentation_slide.errors }
    end
  end

  # @route PATCH /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_slides/:id (circle_theme_presentation_slide)
  # @route PUT /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_slides/:id (circle_theme_presentation_slide)
  def update
    authorize presentation_slide
    if presentation_slide.update(presentation_slide_params)
      redirect_to presentation_slide, notice: "Presentation slide was successfully updated."
    else
      redirect_to edit_presentation_slide_path, inertia: { errors: presentation_slide.errors }
    end
  end

  # @route DELETE /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_slides/:id (circle_theme_presentation_slide)
  def destroy
    authorize presentation_slide
    presentation_slide.destroy!
    redirect_to presentation_slides_url, notice: "Presentation slide was successfully destroyed."
  end
end

class Presentations::SlidesController < ApplicationController
  expose :presentation, id: ->{ params[:presentation_slug] }, find_by: :slug

  expose :slides, ->{ search(presentation.slides.includes_associated) }
  expose :slide, id: ->{ params[:slug] }, scope: ->{ presentation.slides }, find_by: :slug

  strong_params :slide, permit: %i(name data order template)

  sortable_fields %w(name data order template)

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides (theme_presentation_slides)
  def index
    authorize slides, policy_class: Presentation::SlidePolicy

    paginated_slides = paginate(slides, :slides)

    render inertia: "Presentations/Slides/Index", props: {
      slides: -> { paginated_slides.render(:index) },
      pagination: -> { {
        count: slides.size,
        **pagination_data(paginated_slides)
      } },
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides/:slug (theme_presentation_slide)
  def show
    authorize slide, policy_class: Presentation::SlidePolicy

    render inertia: "Presentations/Slides/Show", props: {
      slide: -> { slide.render(:show) }
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides/new (new_theme_presentation_slide)
  def new
    authorize Presentation::Slide.new

    render inertia: "Presentations/Slides/New", props: {
      slide: Presentation::Slide.new.render(:form_data)
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides/:slug/edit (edit_theme_presentation_slide)
  def edit
    authorize slide, policy_class: Presentation::SlidePolicy

    render inertia: "Presentations/Slides/Edit", props: {
      slide: slide.render(:edit)
    }
  end

  # @route POST /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides (theme_presentation_slides)
  def create
    authorize Slide.new, policy_class: Presentation::SlidePolicy

    if slide.save
      redirect_to slide, notice: "Slide was successfully created."
    else
      redirect_to new_slide_path, inertia: { errors: slide.errors }
    end
  end

  # @route PATCH /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides/:slug (theme_presentation_slide)
  # @route PUT /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides/:slug (theme_presentation_slide)
  def update
    authorize slide, policy_class: Presentation::SlidePolicy

    if slide.update(slide_params)
      redirect_to slide, notice: "Slide was successfully updated."
    else
      redirect_to edit_slide_path, inertia: { errors: slide.errors }
    end
  end

  # @route DELETE /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/slides/:slug (theme_presentation_slide)
  def destroy
    authorize slide, policy_class: Presentation::SlidePolicy

    slide.destroy!
    redirect_to slides_url, notice: "Slide was successfully destroyed."
  end

end

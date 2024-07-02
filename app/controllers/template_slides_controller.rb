class TemplateSlidesController < ApplicationController
  include Searchable

  expose :template_slides, -> { search(TemplateSlide.includes_associated, sortable_fields) }
    expose :template_slide, find: ->(id, scope){ scope.includes_associated.find(id) }
  
  # GET /template_slides
  def index
    authorize template_slides

    paginated_%= plural_table_name %> = %= plural_table_name %>.page(params[:page] || 1).per(current_user.limit(:items))

    render inertia: "TemplateSlides/Index", props: {
      template_slides: -> { template_slides.render(view: :index) }
    }
  end

  # GET /template_slides/:id
  def show
    authorize template_slide
    render inertia: "TemplateSlides/Show", props: {
      template_slide: -> { template_slide.render(view: :show) }
    }
  end

  # GET /template_slides/new
  def new
    authorize TemplateSlide.new
    render inertia: "TemplateSlides/New", props: {
      template_slide: TemplateSlide.new.render(view: :new)
    }
  end

  # GET /template_slides/:id/edit
  def edit
    authorize template_slide
    render inertia: "TemplateSlides/Edit", props: {
      template_slide: template_slide.render(view: :edit)
    }
  end

  # POST /template_slides
  def create
    authorize TemplateSlide.new
    if template_slide.save
      redirect_to template_slide, notice: "Template slide was successfully created."
    else
      redirect_to new_template_slide_path, inertia: { errors: template_slide.errors }
    end
  end

  # PATCH/PUT /template_slides/:id
  def update
    authorize template_slide
    if template_slide.update(template_slide_params)
      redirect_to template_slide, notice: "Template slide was successfully updated."
    else
      redirect_to edit_template_slide_path, inertia: { errors: template_slide.errors }
    end
  end

  # DELETE /template_slides/:id
  def destroy
    authorize template_slide
    template_slide.destroy!
    redirect_to template_slides_url, notice: "Template slide was successfully destroyed."
  end

  private

  def sortable_fields
    %w(title content template_id order).freeze
  end

  def template_slide_params
    params.require(:template_slide).permit(:title, :content, :template_id, :order)
  end
end

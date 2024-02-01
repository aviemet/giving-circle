class CirclesController < ApplicationController
  include Searchable

  expose :circles, -> { search(Circle.includes_associated, sortable_fields) }
  expose :circle, id: -> { params[:slug] }, scope: -> { Circle.includes_associated }, find_by: :slug

  # @route GET /circles (circles)
  def index
    # if circles.count == 1
    #   redirect_to [:admin, circles.first]
    #   return
    # end

    authorize circles
    render inertia: "Circles/Index", props: {
      circles: -> { circles.render(view: :index) },
    }
  end

  # @route GET /circles/:slug (circle)
  def show
    authorize circle
    render inertia: "Circles/Show", props: {
      circle: -> { circle.render(view: :show) },
      themes: -> { circle.themes.render }
    }
  end

  # @route GET /circles/:circle_slug/about (circle_about)
  def about
    authorize circle
    render inertia: "Circles/About", props: {
      circle: -> { circle.render(view: :show) },
      themes: -> { circle.themes.render }
    }
  end

  # @route GET /circles/new (new_circle)
  def new
    authorize Circle.new
    render inertia: "Circles/New", props: {
      circle: Circle.new.render
    }
  end

  # @route GET /circles/:slug/edit (edit_circle)
  def edit
    authorize circle
    render inertia: "Circles/Edit", props: {
      circle: circle.render
    }
  end

  # @route POST /circles (circles)
  def create
    authorize Circle.new
    ap({ params: })
    if circle.save
      current_user.add_role(:admin, circle)
      redirect_to [circle], notice: "Circle was successfully created."
    else
      redirect_to new_circle_path, inertia: { errors: circle.errors }
    end
  end

  # @route PATCH /circles/:slug (circle)
  # @route PUT /circles/:slug (circle)
  def update
    authorize circle
    if circle.update(circle_params)
      redirect_to [:admin, circle], notice: "Circle was successfully updated."
    else
      redirect_to [:admin, edit_circle_path], inertia: { errors: circle.errors }
    end
  end

  # @route DELETE /circles/:slug (circle)
  def destroy
    authorize circle
    circle.destroy
    redirect_to [:admin, circles_url], notice: "Circle was successfully destroyed."
  end

  private

  def sortable_fields
    %w(name).freeze
  end

  def circle_params
    params.require(:circle).permit(:name)
  end
end

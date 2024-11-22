class CirclesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:about]

  expose :circles, from: :current_user
  expose :circle, id: -> { params[:circle_slug] }, scope: -> { Circle.includes_associated }, find_by: :slug

  strong_params :circle, permit: %i(name)

  sortable_fields %w(name)

  # @route GET /circles (circles)
  def index
    authorize circles

    render inertia: "Circles/Index", props: {
      circles: -> { circles.render(:index) },
    }
  end

  # @route GET /:circle_slug (circle)
  def show
    authorize circle

    render inertia: "Circles/Show", props: {
      circle: -> { circle.render(:show) },
      themes: -> { circle.themes.render(:index) }
    }
  end

  # @route GET /:circle_slug/about (about_circle)
  def about
    authorize circle

    render inertia: "Public/Circles/About", props: {
      circle: -> { circle.render(:show) },
      themes: -> { circle.themes.render(:index) }
    }
  end

  def new
    authorize Circle.new

    render inertia: "Circles/New", props: {
      circle: Circle.new.render(:form_data)
    }
  end

  # @route GET /:circle_slug/edit (edit_circle)
  def edit
    authorize circle

    render inertia: "Circles/Edit", props: {
      circle: circle.render(:edit)
    }
  end

  def create
    authorize Circle.new

    if circle.save
      current_user.add_role(:admin, circle)
      redirect_to [circle], notice: "Circle was successfully created."
    else
      redirect_to new_circle_path, inertia: { errors: circle.errors }
    end
  end

  # @route PATCH /:circle_slug (circle)
  # @route PUT /:circle_slug (circle)
  def update
    authorize circle

    if circle.update(circle_params)
      redirect_to circle, notice: "Circle was successfully updated."
    else
      redirect_to edit_circle_path, inertia: { errors: circle.errors }
    end
  end

  # @route DELETE /:circle_slug (circle)
  def destroy
    authorize circle

    circle.destroy
    redirect_to [:admin, circles_url], notice: "Circle was successfully destroyed."
  end
end

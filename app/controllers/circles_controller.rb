class CirclesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:about]

  expose :circles, from: :current_user
  expose :circle, id: -> { params[:slug] }, scope: -> { Circle.includes_associated }, find_by: :slug

  strong_params :circle, permit: :name

  # @route GET /circles {export: true} (circles)
  def index
    authorize circles

    render inertia: "Circles/Index", props: {
      circles: -> { circles.render(:index) },
    }
  end

  # @route GET /circles/:slug {export: true} (circle)
  def show
    authorize circle

    render inertia: "Circles/Show", props: {
      circle: -> { circle.render(:show) },
      themes: -> { circle.themes.render(:index) }
    }
  end

  # @route GET /circles/:circle_slug/about {export: true} (circle_about)
  def about
    authorize circle

    render inertia: "Circles/About", props: {
      circle: -> { circle.render(:show) },
      themes: -> { circle.themes.render(:index) }
    }
  end

  # @route GET /circles/new {export: true} (new_circle)
  def new
    authorize Circle.new

    render inertia: "Circles/New", props: {
      circle: Circle.new.render(:form_data)
    }
  end

  # @route GET /circles/:slug/edit {export: true} (edit_circle)
  def edit
    authorize circle

    render inertia: "Circles/Edit", props: {
      circle: circle.render(:edit)
    }
  end

  # @route POST /circles {export: true} (circles)
  def create
    authorize Circle.new

    if circle.save
      current_user.add_role(:admin, circle)
      redirect_to [circle], notice: "Circle was successfully created."
    else
      redirect_to new_circle_path, inertia: { errors: circle.errors }
    end
  end

  # @route PATCH /circles/:slug {export: true} (circle)
  # @route PUT /circles/:slug {export: true} (circle)
  def update
    authorize circle

    if circle.update(circle_params)
      redirect_to circle, notice: "Circle was successfully updated."
    else
      redirect_to edit_circle_path, inertia: { errors: circle.errors }
    end
  end

  # @route DELETE /circles/:slug {export: true} (circle)
  def destroy
    authorize circle

    circle.destroy
    redirect_to [:admin, circles_url], notice: "Circle was successfully destroyed."
  end
end

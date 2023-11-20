class CirclesController < ApplicationController
  include Searchable

  expose :circles, -> { search(Circle.includes_associated, sortable_fields) }
  expose :circle, id: ->{ params[:slug] }, scope: ->{ Circle.includes_associated }, find_by: :slug

  # GET /circles
  def index
    if circles.count == 1
      redirect_to circles.first
      return
    end

    authorize circles
    render inertia: "Circles/Index", props: {
      circles: -> { circles.render },
    }
  end

  # GET /circles/:slug
  def show
    authorize circle
    render inertia: "Circles/Show", props: {
      circle: -> { circle.render(view: :show) },
      themes: -> { circle.themes.render }
    }
  end

  # GET /circles/new
  def new
    authorize Circle.new
    render inertia: "Circles/New", props: {
      circle: Circle.new.render
    }
  end

  # GET /circles/:slug/edit
  def edit
    authorize circle
    render inertia: "Circles/Edit", props: {
      circle: circle.render
    }
  end

  # POST /circles
  def create
    authorize Circle.new
    if circle.save
      current_user.add_role(:admin, circle)
      redirect_to circle, notice: "Circle was successfully created."
    else
      redirect_to new_circle_path, inertia: { errors: circle.errors }
    end
  end

  # PATCH/PUT /circles/:slug
  def update
    authorize circle
    if circle.update(circle_params)
      redirect_to circle, notice: "Circle was successfully updated."
    else
      redirect_to edit_circle_path, inertia: { errors: circle.errors }
    end
  end

  # DELETE /circles/:slug
  def destroy
    authorize circle
    circle.destroy
    redirect_to circles_url, notice: "Circle was successfully destroyed."
  end

  private

  def sortable_fields
    %w(name).freeze
  end

  def circle_params
    params.require(:circle).permit(:name)
  end
end

class CirclesController < ApplicationController
  include Searchable

  expose :circles, -> { search(circles.includes_associated, sortable_fields) }
    expose :circle, scope: ->{ circles }, find: ->(id, scope){ scope.includes_associated.find(id) }
  
  # GET /circles
  def index
    authorize circles
    render inertia: "Circle/Index", props: {
      circles: -> { circles.render(view: :index) }
    }
  end

  # GET /circles/:id
  def show
    authorize circle
    render inertia: "Circle/Show", props: {
      circle: -> { circle.render(view: :show) }
    }
  end

  # GET /circles/new
  def new
    authorize Circle.new
    render inertia: "Circle/New", props: {
      circle: Circle.new.render(view: :form_data)
    }
  end

  # GET /circles/:id/edit
  def edit
    authorize circle
    render inertia: "Circle/Edit", props: {
      circle: circle.render(view: :edit)
    }
  end

  # POST /circles
  def create
    authorize Circle.new
    if circle.save
      redirect_to circle, notice: "Circle was successfully created."
    else
      redirect_to new_circle_path, inertia: { errors: circle.errors }
    end
  end

  # PATCH/PUT /circles/:id
  def update
    authorize circle
    if circle.update(circle_params)
      redirect_to circle, notice: "Circle was successfully updated."
    else
      redirect_to edit_circle_path, inertia: { errors: circle.errors }
    end
  end

  # DELETE /circles/:id
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

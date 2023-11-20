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

  private

  def sortable_fields
    %w(name).freeze
  end

  def circle_params
    params.require(:circle).permit(:name)
  end
end

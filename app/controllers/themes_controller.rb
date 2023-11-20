class ThemesController < ApplicationController
  include Searchable

  expose :themes, -> { search(Theme.includes_associated, sortable_fields) }
  expose :theme, id: ->{ params[:slug] }, scope: ->{ Theme.includes_associated }, find_by: :slug

  # GET /themes
  def index
    authorize themes
    render inertia: "Themes/Index", props: {
      themes: -> { themes.render(view: :index) }
    }
  end

  # GET /themes/:slug
  def show
    authorize theme
    render inertia: "Themes/Show", props: {
      theme: -> { theme.render(view: :show) }
    }
  end

  private

  def sortable_fields
    %w(title quarter slug).freeze
  end

  def theme_params
    params.require(:theme).permit(:title, :quarter, :slug)
  end
end

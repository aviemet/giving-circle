class ThemesController < ApplicationController
  include Searchable

  expose :themes, -> { search(Theme.includes_associated, sortable_fields) }
  expose :theme, id: ->{ params[:slug] }, scope: ->{ Theme.includes_associated }, find_by: :slug

  # @route GET /circles/:circle_slug/themes (circle_themes)
  def index
    authorize themes
    render inertia: "Themes/Index", props: {
      themes: -> { themes.render(view: :index) }
    }
  end

  # @route GET /circles/:circle_slug/themes/:slug (circle_theme)
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

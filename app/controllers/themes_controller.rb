class ThemesController < ApplicationController
  include Searchable

  expose :themes, -> { search(Theme.includes_associated, sortable_fields) }
  expose :theme, id: -> { params[:slug] }, scope: -> { Theme.includes_associated }, find_by: :slug

  # @route GET /circles/:circle_slug/themes (circle_themes)
  def index
    authorize themes
    render inertia: "Themes/Index", props: {
      themes: -> { themes.render(view: :index) },
      circle: -> { Circle.find_by(slug: params[:circle_slug]).render(view: :share) }
    }
  end

  # @route GET /themes/:slug (theme)
  def show
    authorize theme
    render inertia: "Themes/Show", props: {
      theme: -> { theme.render(view: :show) }
    }
  end

  # @route GET /themes/:theme_slug/about (theme_about)
  def about
    authorize theme
    render inertia: "Themes/About", props: {
      themes: -> { theme.themes.render }
    }
  end

  # @route GET /circles/:circle_slug/themes/new (new_circle_theme)
  def new
    authorize Theme.new
    render inertia: "Themes/New", props: {
      theme: Theme.new.render(view: :form_data)
    }
  end

  # @route GET /themes/:slug/edit (edit_theme)
  def edit
    authorize theme
    render inertia: "Themes/Edit", props: {
      theme: theme.render(view: :form_data)
    }
  end

  # @route POST /circles/:circle_slug/themes (circle_themes)
  def create
    authorize Theme.new
    if theme.save
      redirect_to [:admin, theme], notice: "Theme was successfully created."
    else
      redirect_to [:admin, new_theme_path], inertia: { errors: theme.errors }
    end
  end

  # @route PATCH /themes/:slug (theme)
  # @route PUT /themes/:slug (theme)
  def update
    authorize theme
    if theme.update(theme_params)
      redirect_to [:admin, theme], notice: "Theme was successfully updated."
    else
      redirect_to [:admin, edit_theme_path], inertia: { errors: theme.errors }
    end
  end

  # @route DELETE /themes/:slug (theme)
  def destroy
    authorize theme
    theme.destroy
    redirect_to [:admin, themes_url], notice: "Theme was successfully destroyed."
  end

  private

  def sortable_fields
    %w(title quarter slug).freeze
  end

  def theme_params
    params.require(:theme).permit(:title, :quarter, :slug)
  end
end

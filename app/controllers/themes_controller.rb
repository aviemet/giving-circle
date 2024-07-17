class ThemesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:about]

  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug

  expose :themes, -> { search(circle.themes.includes_associated, sortable_fields) }
  expose :theme, id: -> { params[:slug] }, scope: -> { Theme.includes_associated }, find_by: :slug

  # @route GET /circles/:circle_slug/themes (circle_themes)
  def index
    authorize themes

    paginated_themes = themes.page(params[:page] || 1).per(current_user.limit(:items))

    render inertia: "Themes/Index", props: {
      themes: -> { paginated_themes.render(view: :index) },
      pagination: -> { {
        count: themes.size,
        **pagination_data(paginated_themes)
      } },
      circle: -> { circle.render(view: :share) },
    }
  end

  # @route GET /circles/:circle_slug/themes/:slug (circle_theme)
  def show
    authorize theme

    render inertia: "Themes/Show", props: {
      theme: -> { theme.render(view: :show) }
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/about (circle_theme_about)
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
      theme: Theme.new.render(view: :form_data),
      circle: -> { circle.render(view: :share) },
    }
  end

  # @route GET /circles/:circle_slug/themes/:slug/edit (edit_circle_theme)
  def edit
    authorize theme

    render inertia: "Themes/Edit", props: {
      theme: theme.render(view: :form_data),
      circle: -> { circle.render(view: :share) },
    }
  end

  # @route POST /circles/:circle_slug/themes (circle_themes)
  def create
    authorize Theme.new

    theme.circle = circle

    if theme.save
      redirect_to theme, notice: "Theme was successfully created."
    else
      redirect_to new_circle_theme_path(circle.slug), inertia: { errors: theme.errors }
    end
  end

  # @route PATCH /circles/:circle_slug/themes/:slug (circle_theme)
  # @route PUT /circles/:circle_slug/themes/:slug (circle_theme)
  def update
    authorize theme
    if theme.update(theme_params)
      redirect_to theme, notice: "Theme was successfully updated."
    else
      redirect_to edit_theme_path(circle.slug), inertia: { errors: theme.errors }
    end
  end

  # @route DELETE /circles/:circle_slug/themes/:slug (circle_theme)
  def destroy
    authorize theme
    theme.destroy
    redirect_to circle_themes_url(circle.slug), notice: "Theme was successfully destroyed."
  end

  private

  def sortable_fields
    %w(title quarter slug).freeze
  end

  def theme_params
    params.require(:theme).permit(:title, :quarter, :slug)
  end
end

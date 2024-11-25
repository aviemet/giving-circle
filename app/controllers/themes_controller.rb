class ThemesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:about]

  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug

  expose :themes, -> { search(circle.themes.includes_associated) }
  expose :theme, id: -> { params[:slug] }, find_by: :slug

  strong_params :theme, permit: [:title, :quarter, :slug]

  sortable_fields %w(title quarter slug)

  # @route GET /:circle_slug/themes (circle_themes)
  def index
    authorize themes

    paginated_themes = paginate(themes, :themes)

    render inertia: "Themes/Index", props: {
      themes: -> { paginated_themes.render(:index) },
      pagination: -> { {
        count: themes.size,
        **pagination_data(paginated_themes)
      } },
      circle: -> { circle.render(:persisted) },
    }
  end

  # @route GET /:circle_slug/themes/:slug (theme)
  def show
    authorize theme
    render inertia: "Themes/Show", props: {
      theme: -> { theme.render(:show) },
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/about (theme_about)
  def about
    authorize theme

    render inertia: "Themes/About", props: {
      themes: -> { theme.themes.render }
    }
  end

  # @route GET /:circle_slug/themes/new (new_circle_theme)
  def new
    authorize Theme.new

    render inertia: "Themes/New", props: {
      theme: Theme.new.render(:form_data),
      circle: -> { circle.render(:persisted) },
    }
  end

  # @route GET /:circle_slug/themes/:slug/edit (edit_theme)
  def edit
    authorize theme

    render inertia: "Themes/Edit", props: {
      theme: theme.render(:edit),
      circle: -> { circle.render(:persisted) },
    }
  end

  # @route POST /:circle_slug/themes (circle_themes)
  def create
    authorize Theme.new

    theme.circle = circle

    if theme.save
      redirect_to theme, notice: "Theme was successfully created."
    else
      redirect_to new_circle_theme_path(circle.slug), inertia: { errors: theme.errors }
    end
  end

  # @route PATCH /:circle_slug/themes/:slug (theme)
  # @route PUT /:circle_slug/themes/:slug (theme)
  def update
    authorize theme
    if theme.update(theme_params)
      redirect_to theme, notice: "Theme was successfully updated."
    else
      redirect_to edit_theme_path(circle.slug), inertia: { errors: theme.errors }
    end
  end

  # @route DELETE /:circle_slug/themes/:slug (theme)
  def destroy
    authorize theme
    theme.destroy
    redirect_to circle_themes_url(circle.slug), notice: "Theme was successfully destroyed."
  end
end

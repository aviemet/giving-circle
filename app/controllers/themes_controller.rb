class ThemesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:about]

  expose :circle, id: -> { params[:circle_slug] }, find_by: :slug

  expose :themes, -> { search(Circle.includes_associated.find_by(slug: params[:circle_slug]).themes) }
  expose :theme,
    id: -> { params[:slug] },
    scope: -> { Circle.includes_associated.find_by(slug: params[:circle_slug]).themes },
    find_by: :slug

  strong_params :theme, permit: [:name, :status, :slug]

  sortable_fields %w(title status slug)

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

  # @route GET /:circle_slug/themes/:theme_slug (theme)
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

  # @route GET /:circle_slug/themes/:theme_slug/edit (edit_theme)
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
      redirect_to theme_path(params[:circle_slug], theme), notice: t('themes.notices.created')
    else
      redirect_to new_circle_theme_path(params[:circle_slug]), inertia: { errors: theme.errors }
    end
  end

  # @route PATCH /:circle_slug/themes/:theme_slug (theme)
  # @route PUT /:circle_slug/themes/:theme_slug (theme)
  def update
    authorize theme
    ap({ params:, theme:, valid: theme.valid?, errors: theme.errors })
    if theme.update(theme_params)
      redirect_to theme_path(params[:circle_slug], theme), notice: t('themes.notices.updated')
    else
      redirect_to edit_theme_path(params[:circle_slug], theme), inertia: { errors: theme.errors }
    end
  end

  # @route DELETE /:circle_slug/themes/:theme_slug (theme)
  def destroy
    authorize theme

    theme.destroy
    redirect_to circle_themes_path(params[:circle_slug]), notice: t('themes.notices.destroyed')
  end
end

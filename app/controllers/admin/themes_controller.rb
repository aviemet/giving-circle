module Admin
  class ThemesController < AdminController
    include Searchable

    expose :themes, -> { search(Theme.includes_associated, sortable_fields) }
    expose :theme, id: ->{ params[:slug] }, scope: ->{ Theme.includes_associated }, find_by: :slug

    # @route GET /admin/circles/:circle_slug/themes (admin_circle_themes)
    def index
      authorize themes
      render inertia: "Themes/Index", props: {
        themes: -> { themes.render(view: :index) },
        circle: -> { Circle.find_by_slug(params[:circle_slug]).render(view: :share) }
      }
    end

    # @route GET /admin/circles/:circle_slug/themes/:slug (admin_circle_theme)
    def show
      authorize theme
      render inertia: "Themes/Show", props: {
        theme: -> { theme.render(view: :show) }
      }
    end

    # @route GET /admin/circles/:circle_slug/themes/new (new_admin_circle_theme)
    def new
      authorize Theme.new
      render inertia: "Themes/New", props: {
        theme: Theme.new.render(view: :form_data)
      }
    end

    # @route GET /admin/circles/:circle_slug/themes/:slug/edit (edit_admin_circle_theme)
    def edit
      authorize theme
      ap({ theme: })
      render inertia: "Themes/Edit", props: {
        theme: theme.render(view: :form_data)
      }
    end

    # @route POST /admin/themes (admin_themes)
    def create
      authorize Theme.new
      if theme.save
        redirect_to [:admin, theme], notice: "Theme was successfully created."
      else
        redirect_to [:admin, new_theme_path], inertia: { errors: theme.errors }
      end
    end

    # @route PATCH /admin/themes/:id (admin_theme)
    # @route PUT /admin/themes/:id (admin_theme)
    def update
      authorize theme
      if theme.update(theme_params)
        redirect_to [:admin, theme], notice: "Theme was successfully updated."
      else
        redirect_to [:admin, edit_theme_path], inertia: { errors: theme.errors }
      end
    end

    # @route DELETE /admin/circles/:circle_slug/themes/:slug (admin_circle_theme)
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
end

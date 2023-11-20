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

  # GET /themes/new
  def new
    authorize Theme.new
    render inertia: "Themes/New", props: {
      theme: Theme.new.render(view: :form_data)
    }
  end

  # GET /themes/:slug/edit
  def edit
    authorize theme
    ap({ theme: })
    render inertia: "Themes/Edit", props: {
      theme: theme.render(view: :form_data)
    }
  end

  # POST /themes
  def create
    authorize Theme.new
    if theme.save
      redirect_to theme, notice: "Theme was successfully created."
    else
      redirect_to new_theme_path, inertia: { errors: theme.errors }
    end
  end

  # PATCH/PUT /themes/:slug
  def update
    authorize theme
    if theme.update(theme_params)
      redirect_to theme, notice: "Theme was successfully updated."
    else
      redirect_to edit_theme_path, inertia: { errors: theme.errors }
    end
  end

  # DELETE /themes/:slug
  def destroy
    authorize theme
    theme.destroy
    redirect_to themes_url, notice: "Theme was successfully destroyed."
  end

  private

  def sortable_fields
    %w(title question quarter slug).freeze
  end

  def theme_params
    params.require(:theme).permit(:title, :question, :quarter, :slug)
  end
end

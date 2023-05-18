class ThemesController < ApplicationController
  include Searchable

  expose :themes, -> { search(themes.includes_associated, sortable_fields) }
  expose :theme, find: ->(id, scope){ scope.includes_associated.find(id) }

  # GET /themes
  def index
    authorize themes
    render inertia: "Theme/Index", props: {
      themes: -> { themes.render(view: :index) }
    }
  end

  # GET /themes/:id
  def show
    authorize theme
    render inertia: "Theme/Show", props: {
      theme: -> { theme.render(view: :show) }
    }
  end

  # GET /themes/new
  def new
    authorize Theme.new
    render inertia: "Theme/New", props: {
      theme: Theme.new.render(view: :form_data)
    }
  end

  # GET /themes/:id/edit
  def edit
    authorize theme
    render inertia: "Theme/Edit", props: {
      theme: theme.render(view: :edit)
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

  # PATCH/PUT /themes/:id
  def update
    authorize theme
    if theme.update(theme_params)
      redirect_to theme, notice: "Theme was successfully updated."
    else
      redirect_to edit_theme_path, inertia: { errors: theme.errors }
    end
  end

  # DELETE /themes/:id
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

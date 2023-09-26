class Settings::LocalizationsController < ApplicationController
  def index
    render inertia: "Settings/Localization/Index"
  end

  def show
    render inertia: "Settings/Localization/Show"
  end

  def new
    render inertia: "Settings/Localization/New"
  end

  def edit
    render inertia: "Settings/Localization/Edit"
  end

  def create
  end

  def update
  end

  def destroy
  end
end

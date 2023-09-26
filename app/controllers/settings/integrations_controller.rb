class Settings::IntegrationsController < ApplicationController

  def index
    render inertia: "Settings/Integrations/Index"
  end

  def show
    render inertia: "Settings/Integrations/Show"
  end

  def new
    render inertia: "Settings/Integrations/New"
  end

  def edit
    render inertia: "Settings/Integrations/Edit"
  end

  def create
  end

  def update
  end

  def destroy
  end
end

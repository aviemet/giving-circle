class Settings::GeneralController < ApplicationController

  def index
    render inertia: "Settings/General/Index"
  end

  def show
    render inertia: "Settings/General/Show"
  end

  def new
    render inertia: "Settings/General/New"
  end

  def edit
    render inertia: "Settings/General/Edit"
  end

  def create
  end

  def update
  end

  def destroy
  end
end

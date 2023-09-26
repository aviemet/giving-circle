class Settings::NotificationsController < ApplicationController

  def index
    render inertia: "Settings/Notifications/Index"
  end

  def show
    render inertia: "Settings/Notifications/Show"
  end

  def new
    render inertia: "Settings/Notifications/New"
  end

  def edit
    render inertia: "Settings/Notifications/Edit"
  end

  def create
  end

  def update
  end

  def destroy
  end
end

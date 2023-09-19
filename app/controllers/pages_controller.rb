class PagesController < ApplicationController
  def home
    render inertia: "Public/Pages/Home"
  end

  def dashboard
    render inertia: "Pages/Dashboard"
  end
end

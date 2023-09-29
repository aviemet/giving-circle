class PagesController < ApplicationController
  def home
    render inertia: "Public/Pages/Home"
  end

  def dashboard
    render inertia: "Pages/Dashboard", props: {
      themes: current_user.active_circle.themes.render(view: :index)
    }
  end
end

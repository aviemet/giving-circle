class PagesController < ApplicationController
  def home
    render inertia: "Public/Pages/Home"
  end
end

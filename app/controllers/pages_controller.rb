class PagesController < ApplicationController
  # GET /
  def home
    render inertia: "Public/Pages/Home", props: {
    }
  end
end

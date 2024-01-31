class PagesController < ApplicationController
  # GET /
  # @route GET / (root)
  def home
    render inertia: "Public/Pages/Home", props: {
    }
  end
end

class Presentation::DistributionsController < ApplicationController
  expose :presentation_distributions, -> { search(Presentation::Distribution.includes_associated) }
  expose :presentation_distribution, find: ->(id, scope){ scope.includes_associated.find(id) }

  strong_params :presentation_distribution, permit: %i(name type template)

  sortable_fields %w(name type template)

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/distributions (theme_presentation_distributions)
  def index
    authorize presentation_distributions

    paginated_presentation_distributions = paginate(presentation_distributions, :presentation_distributions)

    render inertia: "Presentation::Distributions/Index", props: {
      presentation_distributions: -> { paginated_presentation_distributions.render(:index) },
      pagination: -> { {
        count: presentation_distributions.size,
        **pagination_data(paginated_presentation_distributions)
      } },
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/distributions/:id (theme_presentation_distribution)
  def show
    authorize presentation_distribution
    render inertia: "Presentation::Distributions/Show", props: {
      presentation_distribution: -> { presentation_distribution.render(:show) }
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/distributions/new (new_theme_presentation_distribution)
  def new
    authorize Presentation::Distribution.new
    render inertia: "Presentation::Distributions/New", props: {
      presentation_distribution: Presentation::Distribution.new.render(:form_data)
    }
  end

  # @route GET /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/distributions/:id/edit (edit_theme_presentation_distribution)
  def edit
    authorize presentation_distribution
    render inertia: "Presentation::Distributions/Edit", props: {
      presentation_distribution: presentation_distribution.render(:edit)
    }
  end

  # @route POST /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/distributions (theme_presentation_distributions)
  def create
    authorize Presentation::Distribution.new
    if presentation_distribution.save
      redirect_to presentation_distribution, notice: "Distribution was successfully created."
    else
      redirect_to new_presentation_distribution_path, inertia: { errors: presentation_distribution.errors }
    end
  end

  # @route PATCH /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/distributions/:id (theme_presentation_distribution)
  # @route PUT /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/distributions/:id (theme_presentation_distribution)
  def update
    authorize presentation_distribution
    if presentation_distribution.update(presentation_distribution_params)
      redirect_to presentation_distribution, notice: "Distribution was successfully updated."
    else
      redirect_to edit_presentation_distribution_path, inertia: { errors: presentation_distribution.errors }
    end
  end

  # @route DELETE /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/distributions/:id (theme_presentation_distribution)
  def destroy
    authorize presentation_distribution
    presentation_distribution.destroy!
    redirect_to presentation_distributions_url, notice: "Distribution was successfully destroyed."
  end

end

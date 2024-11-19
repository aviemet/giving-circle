class Presentation::DistributionsController < ApplicationController
  expose :presentation_distributions, -> { search(Presentation::Distribution.includes_associated) }
  expose :presentation_distribution, find: ->(id, scope){ scope.includes_associated.find(id) }
  
  strong_params :presentation_distribution, :name, :type

  sortable_fields %w(name type)

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

  def show
    authorize presentation_distribution
    render inertia: "Presentation::Distributions/Show", props: {
      presentation_distribution: -> { presentation_distribution.render(:show) }
    }
  end

  def new
    authorize Presentation::Distribution.new
    render inertia: "Presentation::Distributions/New", props: {
      presentation_distribution: Presentation::Distribution.new.render(:form_data)
    }
  end

  def edit
    authorize presentation_distribution
    render inertia: "Presentation::Distributions/Edit", props: {
      presentation_distribution: presentation_distribution.render(:edit)
    }
  end

  def create
    authorize Presentation::Distribution.new
    if presentation_distribution.save
      redirect_to presentation_distribution, notice: "Distribution was successfully created."
    else
      redirect_to new_presentation_distribution_path, inertia: { errors: presentation_distribution.errors }
    end
  end

  def update
    authorize presentation_distribution
    if presentation_distribution.update(presentation_distribution_params)
      redirect_to presentation_distribution, notice: "Distribution was successfully updated."
    else
      redirect_to edit_presentation_distribution_path, inertia: { errors: presentation_distribution.errors }
    end
  end

  def destroy
    authorize presentation_distribution
    presentation_distribution.destroy!
    redirect_to presentation_distributions_url, notice: "Distribution was successfully destroyed."
  end

end

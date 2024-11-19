class Presentation::LeveragesController < ApplicationController
  expose :presentation_leverages, -> { search(Presentation::Leverage.includes_associated) }
  expose :presentation_leverage, find: ->(id, scope){ scope.includes_associated.find(id) }
  
  strong_params :presentation_leverage, :name, :type

  sortable_fields %w(name type)

  def index
    authorize presentation_leverages

    paginated_presentation_leverages = paginate(presentation_leverages, :presentation_leverages)

    render inertia: "Presentation::Leverages/Index", props: {
      presentation_leverages: -> { paginated_presentation_leverages.render(:index) },
      pagination: -> { {
        count: presentation_leverages.size,
        **pagination_data(paginated_presentation_leverages)
      } },
    }
  end

  def show
    authorize presentation_leverage
    render inertia: "Presentation::Leverages/Show", props: {
      presentation_leverage: -> { presentation_leverage.render(:show) }
    }
  end

  def new
    authorize Presentation::Leverage.new
    render inertia: "Presentation::Leverages/New", props: {
      presentation_leverage: Presentation::Leverage.new.render(:form_data)
    }
  end

  def edit
    authorize presentation_leverage
    render inertia: "Presentation::Leverages/Edit", props: {
      presentation_leverage: presentation_leverage.render(:edit)
    }
  end

  def create
    authorize Presentation::Leverage.new
    if presentation_leverage.save
      redirect_to presentation_leverage, notice: "Leverage was successfully created."
    else
      redirect_to new_presentation_leverage_path, inertia: { errors: presentation_leverage.errors }
    end
  end

  def update
    authorize presentation_leverage
    if presentation_leverage.update(presentation_leverage_params)
      redirect_to presentation_leverage, notice: "Leverage was successfully updated."
    else
      redirect_to edit_presentation_leverage_path, inertia: { errors: presentation_leverage.errors }
    end
  end

  def destroy
    authorize presentation_leverage
    presentation_leverage.destroy!
    redirect_to presentation_leverages_url, notice: "Leverage was successfully destroyed."
  end

end

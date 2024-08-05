class LeveragesController < ApplicationController
  include Searchable

  expose :leverages, -> { search(Leverage.includes_associated, sortable_fields) }
  expose :leverage, find: ->(id, scope){ scope.includes_associated.find(id) }
  
  # GET /leverages
  def index
    authorize leverages

    paginated_leverages = paginate(leverages, :leverages)

    render inertia: "Leverages/Index", props: {
      leverages: -> { paginated_leverages.render(:index) },
      pagination: -> { {
        count: leverages.size,
        **pagination_data(paginated_leverages)
      } },
    }
  end

  # GET /leverages/:id
  def show
    authorize leverage
    render inertia: "Leverages/Show", props: {
      leverage: -> { leverage.render(:show) }
    }
  end

  # GET /leverages/new
  def new
    authorize Leverage.new
    render inertia: "Leverages/New", props: {
      leverage: Leverage.new.render(:form_data)
    }
  end

  # GET /leverages/:id/edit
  def edit
    authorize leverage
    render inertia: "Leverages/Edit", props: {
      leverage: leverage.render(:edit)
    }
  end

  # POST /leverages
  def create
    authorize Leverage.new
    if leverage.save
      redirect_to leverage, notice: "Leverage was successfully created."
    else
      redirect_to new_leverage_path, inertia: { errors: leverage.errors }
    end
  end

  # PATCH/PUT /leverages/:id
  def update
    authorize leverage
    if leverage.update(leverage_params)
      redirect_to leverage, notice: "Leverage was successfully updated."
    else
      redirect_to edit_leverage_path, inertia: { errors: leverage.errors }
    end
  end

  # DELETE /leverages/:id
  def destroy
    authorize leverage
    leverage.destroy!
    redirect_to leverages_url, notice: "Leverage was successfully destroyed."
  end

  private

  def sortable_fields
    %w(name type).freeze
  end

  def leverage_params
    params.require(:leverage).permit(:name, :type)
  end
end

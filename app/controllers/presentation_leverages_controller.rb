class PresentationLeveragesController < ApplicationController
  include Searchable

  expose :presentation_leverages, -> { search(PresentationLeverage.includes_associated, sortable_fields) }
  expose :presentation_leverage, find: ->(id, scope){ scope.includes_associated.find(id) }
  
  # @route GET /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_leverages (circle_theme_presentation_leverages)
  def index
    authorize presentation_leverages

    paginated_presentation_leverages = paginate(presentation_leverages, :presentation_leverages)

    render inertia: "PresentationLeverages/Index", props: {
      presentation_leverages: -> { paginated_presentation_leverages.render(:index) },
      pagination: -> { {
        count: presentation_leverages.size,
        **pagination_data(paginated_presentation_leverages)
      } },
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_leverages/:id (circle_theme_presentation_leverage)
  def show
    authorize presentation_leverage
    render inertia: "PresentationLeverages/Show", props: {
      presentation_leverage: -> { presentation_leverage.render(:show) }
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_leverages/new (new_circle_theme_presentation_leverage)
  def new
    authorize PresentationLeverage.new
    render inertia: "PresentationLeverages/New", props: {
      presentation_leverage: PresentationLeverage.new.render(:form_data)
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_leverages/:id/edit (edit_circle_theme_presentation_leverage)
  def edit
    authorize presentation_leverage
    render inertia: "PresentationLeverages/Edit", props: {
      presentation_leverage: presentation_leverage.render(:edit)
    }
  end

  # @route POST /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_leverages (circle_theme_presentation_leverages)
  def create
    authorize PresentationLeverage.new
    if presentation_leverage.save
      redirect_to presentation_leverage, notice: "Presentation leverage was successfully created."
    else
      redirect_to new_presentation_leverage_path, inertia: { errors: presentation_leverage.errors }
    end
  end

  # @route PATCH /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_leverages/:id (circle_theme_presentation_leverage)
  # @route PUT /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_leverages/:id (circle_theme_presentation_leverage)
  def update
    authorize presentation_leverage
    if presentation_leverage.update(presentation_leverage_params)
      redirect_to presentation_leverage, notice: "Presentation leverage was successfully updated."
    else
      redirect_to edit_presentation_leverage_path, inertia: { errors: presentation_leverage.errors }
    end
  end

  # @route DELETE /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_leverages/:id (circle_theme_presentation_leverage)
  def destroy
    authorize presentation_leverage
    presentation_leverage.destroy!
    redirect_to presentation_leverages_url, notice: "Presentation leverage was successfully destroyed."
  end

  private

  def sortable_fields
    %w(name type).freeze
  end

  def presentation_leverage_params
    params.require(:presentation_leverage).permit(:name, :type)
  end
end

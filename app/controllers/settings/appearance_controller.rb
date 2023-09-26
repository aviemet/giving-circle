class Settings::AppearanceController < ApplicationController
  def index
    render inertia: "Settings/Appearance/Index", props: {
      settings: {
        primary_color: @active_company.settings&.[]("primary_color")
      }
    }
  end

  def update
    if @active_company.update(settings_params)
      redirect_to settings_appearance_index_path, notice: 'Appearance setttings successfully updated'
    else
      redirect_to settings_appearance_index_path, inertia: { errors: @active_company.errors }
    end
  end

  private

  def settings_params
    params.require(:settings).permit(:primary_color)
  end
end

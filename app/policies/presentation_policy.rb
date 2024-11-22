class PresentationPolicy < ApplicationPolicy
  class Scope < Scope
  end

  def run_presentation?
    true
  end
end

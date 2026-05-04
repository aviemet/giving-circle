class ThemePolicy < ApplicationPolicy
  class Scope < Scope
  end

  def about?
    true
  end
end

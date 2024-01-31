class PeopleController < ApplicationController
  include Searchable

  expose :people, -> { search(Person.includes_associated, sortable_fields) }
    expose :person, find: ->(id, scope){ scope.includes_associated.find(id) }
  
  # GET /people
  def index
    authorize people
    render inertia: "People/Index", props: {
      people: -> { people.render }
    }
  end

  # GET /people/:id
  def show
    authorize person
    render inertia: "People/Show", props: {
      person: -> { person.render }
    }
  end

  # GET /people/new
  def new
    authorize Person.new
    render inertia: "People/New", props: {
      person: Person.new.render
    }
  end

  # GET /people/:id/edit
  def edit
    authorize person
    render inertia: "People/Edit", props: {
      person: person.render
    }
  end

  # POST /people
  def create
    authorize Person.new
    if person.save
      redirect_to person, notice: "Person was successfully created."
    else
      redirect_to new_person_path, inertia: { errors: person.errors }
    end
  end

  # PATCH/PUT /people/:id
  def update
    authorize person
    if person.update(person_params)
      redirect_to person, notice: "Person was successfully updated."
    else
      redirect_to edit_person_path, inertia: { errors: person.errors }
    end
  end

  # DELETE /people/:id
  def destroy
    authorize person
    person.destroy!
    redirect_to people_url, notice: "Person was successfully destroyed."
  end

  private

  def sortable_fields
    %w(first_name last_name middle_name active).freeze
  end

  def person_params
    params.require(:person).permit(:first_name, :last_name, :middle_name, :active)
  end
end

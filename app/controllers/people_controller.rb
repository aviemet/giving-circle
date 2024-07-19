class PeopleController < ApplicationController
  expose :people, -> { search(Person.includes_associated, sortable_fields) }
  expose :person, find: ->(id, scope) { scope.includes_associated.find(id) }

  strong_params :person, permit: [:first_name, :last_name, :middle_name, :active]

  # @route GET /people {export: true} (people)
  def index
    authorize people

    paginated_people = paginate(circle_people, :items)

    render inertia: "People/Index", props: {
      people: -> { paginated_people.render },
      pagination: -> { {
        count: people.size,
        **pagination_data(paginated_people)
      } },
    }
  end

  # @route GET /people/:slug {export: true} (person)
  def show
    authorize person

    render inertia: "People/Show", props: {
      person: -> { person.render }
    }
  end

  # @route GET /people/new {export: true} (new_person)
  def new
    authorize Person.new

    render inertia: "People/New", props: {
      person: Person.new.render
    }
  end

  # @route GET /people/:slug/edit {export: true} (edit_person)
  def edit
    authorize person

    render inertia: "People/Edit", props: {
      person: person.render
    }
  end

  # @route POST /people {export: true} (people)
  def create
    authorize Person.new

    if person.save
      redirect_to person, notice: "Person was successfully created."
    else
      redirect_to new_person_path, inertia: { errors: person.errors }
    end
  end

  # @route PATCH /people/:slug {export: true} (person)
  # @route PUT /people/:slug {export: true} (person)
  def update
    authorize person

    if person.update(person_params)
      redirect_to person, notice: "Person was successfully updated."
    else
      redirect_to edit_person_path, inertia: { errors: person.errors }
    end
  end

  # @route DELETE /people/:slug {export: true} (person)
  def destroy
    authorize person
    person.destroy!
    redirect_to people_url, notice: "Person was successfully destroyed."
  end

  private

  def sortable_fields
    %w(first_name last_name middle_name active).freeze
  end
end

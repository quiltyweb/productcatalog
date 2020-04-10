import { BaseCommand, Kernel } from '@adonisjs/ace'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { inject } from '@adonisjs/fold'
// For some reason, this only works with require
const jest = require('jest')

import Category from '../app/Models/Category'

@inject([null, null, 'Adonis/Lucid/Orm'])
export default class Test extends BaseCommand {
  public static commandName = 'test'
  public static description = 'Makeshift test runner for unit tests in Adonis'

  /**
   * This command loads the application, since we need the runtime
   * to do much of anything
   */
  public static settings = {
    loadApp: true,
  }

  constructor(app: ApplicationContract, kernel: Kernel) {
    super(app, kernel)
  }

  public async handle() {
    const cat = new Category()
    cat.name = 'asdf'
    this.logger.info(cat.name)

    const options = {
      projects: [process.cwd()],
      colors: true,
      _: [process.cwd()],
      $0: process.cwd()
    };

    jest.runCLI(options, options.projects)
      .then((success) => {
        this.logger.info(success);
      })
      .catch((failure) => {
        this.logger.error(failure);
      });
  }
}
